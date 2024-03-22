QUEST_2019 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000210',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 33,
		max_level = 38,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 33000,
		exp = 54900,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_MOONSTONE', quantity = 30, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000211',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000212',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000213',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000214',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000215',
		},
	}
}
