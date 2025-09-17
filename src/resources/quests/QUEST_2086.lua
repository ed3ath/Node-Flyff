QUEST_2086 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000947',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 105,
		max_level = 111,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 800000,
		exp = 523578599,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_POISONBAG', quantity = 70, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000948',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000949',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000950',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000951',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000952',
		},
	}
}
