QUEST_TRUTH_BONEBOWL = {
	title = 'IDS_PROPQUEST_INC_000990',
	character = 'MaSa_Bowler',
	end_character = 'MaSa_QueerCollector',
	start_requirements = {
		min_level = 44,
		max_level = 60,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_FIRST_BONEBOWL',
	},
	rewards = {
		gold = 0,
		exp = 79996,
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_BONEBOWL', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000991',
			'IDS_PROPQUEST_INC_000992',
			'IDS_PROPQUEST_INC_000993',
			'IDS_PROPQUEST_INC_000994',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000995',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000996',
		},
		completed = {
			'IDS_PROPQUEST_INC_000997',
			'IDS_PROPQUEST_INC_000998',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000999',
		},
	}
}
