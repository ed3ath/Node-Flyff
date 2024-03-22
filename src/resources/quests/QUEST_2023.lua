QUEST_2023 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000254',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 41,
		max_level = 46,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 41000,
		exp = 87710,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_CLOCKHEART', quantity = 35, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000255',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000256',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000257',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000258',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000259',
		},
	}
}
