QUEST_2017 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000188',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 29,
		max_level = 34,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 29000,
		exp = 24180,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_HAMMARBLE', quantity = 30, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000189',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000190',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000191',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000192',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000193',
		},
	}
}
