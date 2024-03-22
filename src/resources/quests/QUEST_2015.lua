QUEST_2015 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000166',
	character = 'MaFl_Mikyel',
	end_character = 'MaFl_Mikyel',
	start_requirements = {
		min_level = 25,
		max_level = 27,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 12500,
		exp = 5990,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_UNKLETTER', quantity = 30, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000167',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000168',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000169',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000170',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000171',
		},
	}
}
